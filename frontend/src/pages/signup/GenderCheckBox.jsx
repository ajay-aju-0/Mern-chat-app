import React from 'react'

const GenderCheckBox = ({onCheckBoxChange,selectedGender}) => {
  return (
    <div className='flex'>
        <div>
            <label className={`label gap-2 font-bold text-white ${selectedGender === "male" ? "selected" : ""}`}>Gender:</label>
        </div>
        <div className='form-control'>
            <label className="label gap-2 cursor-pointer">
                <input type="checkbox" 
                       className="checkbox border-slate-100"
                       checked={selectedGender === "male"}
                       onChange={() => onCheckBoxChange("male")} />
                <span className="label-text font-bold text-white">Male</span>
            </label>
        </div>
        <div className='form-control'>
            <label className={`label gap-2 cursor-pointer ${selectedGender === "female" ? "selected" : ""}`}>
                <input type="checkbox" 
                       className="checkbox border-slate-100"
                       checked={selectedGender === "female"}
                       onChange={() => onCheckBoxChange("female")} />
                <span className="label-text font-bold text-white">Female</span>
            </label>
        </div>
    </div>
  )
}

export default GenderCheckBox