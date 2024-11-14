import React from "react";
import Select from "./Select";

type LevelChangeDialogProps = {
  level: string;
  setLevel: (level: string) => void;
};

const LevelChangeDialog: React.FC<LevelChangeDialogProps> = ({ level, setLevel }) => {
  return (
    <div className="mb-3">
          <Select
      value={level}
      onChange={(value) => setLevel(value)}
      options={[
        { label: 'Facile', value: 'Facile' },
        { label: 'Moyen', value: 'Moyen' },
        { label: 'Difficile', value: 'Difficile' },
      ]}
    />
    </div>
  );
};

export default LevelChangeDialog;