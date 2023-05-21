import clsx from "clsx";

export default function Palette(props) {
    const { className, white, red, orange, yellow, teal, blue, purple, gray, sample, ...rest } = props;

    const classNames = clsx({
        color: true,
        "color-white": white,
        "color-red": red,
        "color-orange": orange,
        "color-yellow": yellow,
        "color-teal": teal,
        "color-blue": blue,
        "color-purple": purple,
        "color-gray": gray,
    }, className);

    return (
        <div className={`${classNames} ${sample === classNames.split(" ")[1] ? "is-active" : ""}`} {...rest}></div>
    )
}