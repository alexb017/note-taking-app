import clsx from "clsx";
import { forwardRef } from "react";

const Button = forwardRef((props, ref) => {
    const { children, className, def, type = "button", accent, note, secondary, ...rest } = props;

    const classNames = clsx({
        btn: true,
        "btn-default": def,
        "btn-accent": accent,
        "btn-note": note,
        "btn-secondary": secondary
    },
        className
    );

    return (
        <button type={type} className={classNames} ref={ref} {...rest}>
            {children}
        </button>
    )
})

export default Button;