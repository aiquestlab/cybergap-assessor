
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
      // Parse the JSON data
      let parsedData: ExtendedControl[] = JSON.parse(jsonData);
      
      // If it's not an array, check if it's an object with a property that's an array
      if (!Array.isArray(parsedData)) {
        // Try to find an array property in the object
        const arrayProp = Object.values(parsedData).find(val => Array.isArray(val));
        if (arrayProp && Array.isArray(arrayProp)) {
          parsedData = arrayProp as ExtendedControl[];
        } else {
          throw new Error("Couldn't find an array in the imported data");
        }
      }
      
      // Convert to simple controls for the app
      const simpleControls: Control[] = parsedData.map(control => convertToSimpleControl(control));
      
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
              onChange={(e) => setJsonData(e.target.value)}
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
