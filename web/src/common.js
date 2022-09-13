const ColoredLine = ({ color, height }) => (
    <hr
        style={{
            border:0,
            clear:"both",
            color: color,
            backgroundColor: color,
            height: height
        }}
    />
);


export {ColoredLine};