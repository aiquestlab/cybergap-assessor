
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ExtendedControl } from '@/utils/cmmcControlsData';
import { Control } from '@/utils/cmmcData';
import { convertToSimpleControl } from '@/utils/cmmcControlsData';

interface CMMCDataImporterProps {
  onImport: (controls: Control[]) => void;
}

const CMMCDataImporter: React.FC<CMMCDataImporterProps> = ({ onImport }) => {
  const [jsonData, setJsonData] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [importedCount, setImportedCount] = useState(0);
  const [open, setOpen] = useState(false);

  const handleImport = () => {
    try {
      // Clean the JSON data - remove potential problematic characters
      let cleanedData = jsonData.trim();
      
      // Try to fix common JSON issues
      // Remove trailing commas (common issue)
      cleanedData = cleanedData.replace(/,\s*([\]}])/g, '$1');
      
      // Remove single-line comments (not valid in JSON but common in JS)
      cleanedData = cleanedData.replace(/\/\/.*$/gm, '');
      
      // Remove multi-line comments
      cleanedData = cleanedData.replace(/\/\*[\s\S]*?\*\//g, '');
      
      // Attempt to parse the cleaned data
      let parsedData: ExtendedControl[] | Record<string, unknown>;
      
      try {
        parsedData = JSON.parse(cleanedData);
      } catch (jsonError) {
        // If still fails, let's try to be even more lenient
        // Sometimes there might be a data assignment like: const data = [...];
        const arrayMatch = cleanedData.match(/\[\s*\{[\s\S]*\}\s*\]/);
        if (arrayMatch) {
          try {
            parsedData = JSON.parse(arrayMatch[0]);
          } catch (innerError) {
            throw jsonError; // If this also fails, throw the original error
          }
        } else {
          throw jsonError;
        }
      }
      
      // Convert to array if it's not already
      let controlsArray: ExtendedControl[];
      
      if (!Array.isArray(parsedData)) {
        // It's an object, try to find an array property
        const arrayProps = Object.values(parsedData).filter(val => Array.isArray(val));
        
        if (arrayProps.length > 0) {
          // Use the first array property found
          controlsArray = arrayProps[0] as ExtendedControl[];
        } else {
          throw new Error("Couldn't find an array of controls in the imported data");
        }
      } else {
        controlsArray = parsedData;
      }
      
      // Validate that these look like controls
      if (controlsArray.length === 0) {
        throw new Error("No controls found in the imported data");
      }
      
      // Basic validation of the first item
      const firstItem = controlsArray[0];
      if (!firstItem.cmmcId || !firstItem.domain || !firstItem.name) {
        throw new Error("The imported data doesn't appear to be in the expected format");
      }
      
      // Convert to simple controls for the app
      const simpleControls: Control[] = controlsArray.map(control => convertToSimpleControl(control));
      
      // Call the onImport callback
      onImport(simpleControls);
      setImportedCount(simpleControls.length);
      setError(null);
      setOpen(false);
    } catch (err) {
      console.error("Import error:", err);
      setError(err instanceof Error ? err.message : "Failed to import data");
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const data = e.clipboardData.getData('text');
    setJsonData(data);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonData(e.target.value);
    setError(null); // Clear error when text changes
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Import CMMC Controls</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[725px]">
          <DialogHeader>
            <DialogTitle>Import CMMC Controls Data</DialogTitle>
            <DialogDescription>
              Paste your CMMC controls array data below. The data should be in JSON format.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <Textarea 
              placeholder="Paste JSON data here..." 
              className="min-h-[300px]"
              value={jsonData} 
              onChange={handleTextareaChange}
              onPaste={handlePaste}
            />
            
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {importedCount > 0 && (
              <Alert>
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>Successfully imported {importedCount} controls!</AlertDescription>
              </Alert>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleImport}>Import Data</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CMMCDataImporter;
