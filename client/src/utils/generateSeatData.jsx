export const generateSeatData = (rows, cols) => {
    return Array.from({ length: rows }, (_, rowIndex) =>
        Array.from({ length: cols }, (_, colIndex) => ({ free: Math.random() > 0.5, number: `${String.fromCharCode(65 + rowIndex)}${colIndex + 1}` }))
    );
};