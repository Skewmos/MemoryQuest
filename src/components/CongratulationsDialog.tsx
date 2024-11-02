import React, { useEffect, useState } from 'react';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from  './ui/alert-dialog';

interface CongratulationsDialogProps {
    turns: number;           
    bestScore: number | null;
    isGameCompleted: boolean;
  }

const CongratulationsDialog: React.FC<CongratulationsDialogProps> = ({ turns, bestScore, isGameCompleted }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isGameCompleted) {
      setIsOpen(true);
    }
  }, [isGameCompleted]);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center text-green-600 font-semibold text-xl">
            Félicitations !
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-lg">
            Vous avez découvert toutes les paires en {turns} tours.
            {bestScore === turns && <p>Nouveau meilleur score !</p>}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-end mt-4">
          <AlertDialogCancel onClick={handleClose}>Fermer</AlertDialogCancel>
          <AlertDialogAction onClick={handleClose}>OK</AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CongratulationsDialog;
