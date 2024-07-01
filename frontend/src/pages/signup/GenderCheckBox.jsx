import React from 'react'

const GenderCheckBox = () => {
  return (
    <div className='flex'>
        <div>
            <label className="label gap-2 font-bold">Gender:</label>
        </div>
        <div className='form-control'>
            <label className="label gap-2 cursor-pointer">
                <span className="label-text font-bold text-white">Male</span>
                <input type="checkbox" className="checkbox border-slate-100" />
            </label>
        </div>
        <div className='form-control'>
            <label className="label gap-2 cursor-pointer">
                <span className="label-text font-bold text-white">Female</span>
                <input type="checkbox" className="checkbox border-slate-100" />
            </label>
        </div>
    </div>
  )
}

export default GenderCheckBox