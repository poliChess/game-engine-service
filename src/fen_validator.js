import { isValidFenPosition, normalizer } from "fen-reader";

const isValidFen = (fen) => {
    const fenElements = normalizer(fen);
    const fenPositionResponse = isValidFenPosition({ position: fenElements[0] });
    
    return fenPositionResponse.isValid;
}

export default isValidFen;
