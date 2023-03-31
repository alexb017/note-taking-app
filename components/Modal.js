import { forwardRef } from "react";

const Modal = forwardRef((props, ref) => {
    const { children, className, ...rest } = props;

    return (
        <div className={className} ref={ref} {...rest}>
            {children}
        </div>
    )
})

export default Modal;