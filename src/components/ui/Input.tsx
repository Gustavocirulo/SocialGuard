import type { InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
}

function Input({
  label,
  helperText,
  className = "",
  ...props
}: InputProps) {
  return (
    <div>
      {label && (
        <label
          htmlFor={props.id}
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}

      <input
        {...props}
        className={`w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-50 ${className}`}
      />

      {helperText && (
        <p className="mt-2 text-xs text-slate-400">
          {helperText}
        </p>
      )}
    </div>
  )
}

export default Input