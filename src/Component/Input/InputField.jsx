import { forwardRef } from "react";
import PropTypes from "prop-types";

/**
 * Single, reusable input component that can render:
 *  - input types (text, password, email, number, etc.)
 *  - select (with options or loader)
 *  - textarea
 *  - checkbox / radio
 *
 * Design choices:
 *  - Uses Tailwind utility classes by default; override with `className`
 *  - Accessible: label `htmlFor`, `aria-*` props forwarded
 *  - Exposes ref via forwardRef for forms or focus control
 */

/**
 * @typedef {Object} Option
 * @property {string} value
 * @property {React.ReactNode} [label]
 * @property {boolean} [disabled]
 */

/**
 * @typedef {Object} InputFieldProps
 * @property {string} [id]
 * @property {string} [name]
 * @property {React.ReactNode} [label]
 * @property {string} [labelClassName]
 * @property {"top"|"left"} [labelPosition]
 * @property {"text"|"password"|"email"|"number"|"select"|"textarea"|"checkbox"|"radio"|"file"} [type]
 * @property {*} [value]
 * @property {Option[]} [options]
 * @property {boolean} [loading]
 * @property {function} [onChange]
 * @property {string} [placeholder]
 * @property {boolean} [required]
 * ...
 */

/**
 * @param {InputFieldProps} props
 */
const baseInputClasses =
  "w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-opacity-50";

/* Simple spinner (SVG) used for loader states */
const Spinner = ({ size = 20 }) => (
  <svg
    className="animate-spin"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeOpacity="0.25"
      strokeWidth="4"
    />
    <path
      d="M22 12a10 10 0 00-10-10"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

const InputField = forwardRef((props, ref) => {
  const {
    id,
    name,
    label,
    labelClassName = "font-medium",
    labelPosition = "top", // 'top' | 'left'
    type = "text", // input type or 'select' | 'textarea' | 'checkbox' | 'radio'
    value,
    onChange,
    placeholder,
    required = false,
    disabled = false,
    readOnly = false,
    error,
    helpText,
    className = "",
    inputClassName = "",
    wrapperClassName = "",
    options = [], // for select: [{ value, label, disabled }]
    loading = false, // show loader (for select or when data fetching)
    showCount = false, // for textarea: show char count
    maxLength,
    minLength,
    min,
    max,
    prefix, // element/text to show before input
    suffix, // element/text to show after input
    inlineLabelWidth = "w-40", // if labelPosition === 'left'
    onBlur,
    aria = {},
    ...rest
  } = props;

  const inputId =
    id || name || `input_${Math.random().toString(36).slice(2, 9)}`;

  const renderLabel = () => {
    if (!label) return null;
    return (
      <label
        htmlFor={inputId}
        className={
          labelClassName +
          (required ? " after:content-['*'] after:ml-1 after:text-red-500" : "")
        }
      >
        {label}
      </label>
    );
  };

  const commonProps = {
    id: inputId,
    name,
    value,
    onChange,
    maxLength,
    placeholder,
    disabled,
    readOnly,
    required,
    ref,
    min,
    max,
    onBlur,
    minLength,
    "aria-invalid": !!error || undefined,
    ...aria,
    ...rest,
  };

  const inputElement = (() => {
    if (type === "select") {
      return (
        <select
          {...commonProps}
          className={`${baseInputClasses} ${inputClassName} ${
            disabled ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          <option value="">{loading ? "Loading..." : "Select..."}</option>

          {loading
            ? null
            : options?.map((opt, idx) => (
                <option
                  key={opt?.value ?? idx}
                  value={opt?.value ?? ""}
                  disabled={opt?.disabled}
                >
                  {opt?.label ?? opt?.value}
                </option>
              ))}
        </select>
      );
    }

    if (type === "textarea") {
      return (
        <>
          <textarea
            {...commonProps}
            maxLength={maxLength}
            className={`${baseInputClasses} ${inputClassName} resize-vertical ${
              disabled ? "opacity-60 cursor-not-allowed" : ""
            }`}
          />
          {showCount && (
            <div className="text-sm mt-1 text-gray-500">
              {String(value ?? "").length}
              {maxLength ? ` / ${maxLength}` : ""}
            </div>
          )}
        </>
      );
    }

    if (type === "checkbox" || type === "radio") {
      return (
        <div className="flex items-center">
          <input
            {...commonProps}
            type={type}
            checked={!!value}
            className={`${inputClassName} mr-2 ${disabled ? "opacity-60" : ""}`}
          />
          {label && (
            <label htmlFor={inputId} className={labelClassName}>
              {label}
            </label>
          )}
        </div>
      );
    }

    // Default: input (text, password, email, number, etc.)
    return (
      <div className="relative flex items-center">
        {prefix && <div className="mr-2">{prefix}</div>}
        <input
          {...commonProps}
          type={type}
          className={`${baseInputClasses} ${inputClassName} ${
            disabled ? "opacity-60 cursor-not-allowed" : ""
          }`}
        />
        {loading && (
          <div className="absolute right-2">
            <Spinner size={18} />
          </div>
        )}
        {suffix && <div className="ml-2">{suffix}</div>}
      </div>
    );
  })();

  // Layout: label on left or top
  return (
    <div className={`mb-4 ${wrapperClassName}`}>
      {labelPosition === "left" ? (
        <div className="flex items-start gap-4">
          <div className={`${inlineLabelWidth} pt-2`}>{renderLabel()}</div>
          <div className="flex-1">
            {type !== "checkbox" && type !== "radio" && error ? (
              <>
                {inputElement}
                <p className="text-sm text-red-600 mt-1">{error}</p>
              </>
            ) : (
              <>
                {inputElement}
                {type !== "checkbox" && type !== "radio" && helpText && (
                  <p className="text-sm text-gray-500 mt-1">{helpText}</p>
                )}
                {error && (type === "checkbox" || type === "radio") && (
                  <p className="text-sm text-red-600 mt-1">{error}</p>
                )}
              </>
            )}
          </div>
        </div>
      ) : (
        <>
          {renderLabel()}
          <div className="mt-1">
            {type !== "checkbox" && type !== "radio" && error ? (
              <>
                {inputElement}
                <p className="text-sm text-red-600 mt-1">{error}</p>
              </>
            ) : (
              <>
                {inputElement}
                {type !== "checkbox" && type !== "radio" && helpText && (
                  <p className="text-sm text-gray-500 mt-1">{helpText}</p>
                )}
                {error && (type === "checkbox" || type === "radio") && (
                  <p className="text-sm text-red-600 mt-1">{error}</p>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
});

InputField.displayName = "InputField";

InputField.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  labelClassName: PropTypes.string,
  labelPosition: PropTypes.oneOf(["top", "left"]),
  type: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  error: PropTypes.string,
  helpText: PropTypes.string,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  wrapperClassName: PropTypes.string,
  options: PropTypes.array,
  loading: PropTypes.bool,
  showCount: PropTypes.bool,
  maxLength: PropTypes.number,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  inlineLabelWidth: PropTypes.string,
  onBlur: PropTypes.func,
  aria: PropTypes.object,
};

export default InputField;
