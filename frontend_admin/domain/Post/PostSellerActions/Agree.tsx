import React, { Dispatch, FC, SetStateAction } from "react";

import Checkbox from "components/Checkbox";

interface Props {
  agree: boolean;
  setAgree: Dispatch<SetStateAction<boolean>>;
}

const Agree: FC<Props> = ({ agree, setAgree }) => {
  return (
    <>
      <p className="pt-2">⚠️ 開單注意事項:</p>
      <ul className="text-sm list-disc list-inside pl-2">
        <li>結單前，團員有權利取消訂單</li>
        <li>平台費為6%，待認購為10%</li>
      </ul>
      <div className="flex items-center ml-2 mt-1">
        <Checkbox
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
        />
        <p
          className="ml-2 text-sm cursor-pointer select-none"
          onClick={() => setAgree(!agree)}
        >
          我已閱讀並同意開單注意事項
        </p>
      </div>
    </>
  );
};

export default Agree;
