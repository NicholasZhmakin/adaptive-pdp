const onScale = ({ target, delta, clientX, clientY }) => {
    const scaleX = frameRef.current.get("transform", "scaleX") * delta[0];
    const scaleY = frameRef.current.get("transform", "scaleY") * delta[1];
    frameRef.current.set("transform", "scaleX", scaleX);
    frameRef.current.set("transform", "scaleY", scaleY);
    setTransform(target);
};

const onWarp = ({ target, clientX, clientY, delta, multiply }) => {
    frameRef.current.set(
        "transform",
        "matrix3d",
        multiply(frameRef.current.get("transform", "matrix3d"), delta)
    );

    setTransform(target);
};