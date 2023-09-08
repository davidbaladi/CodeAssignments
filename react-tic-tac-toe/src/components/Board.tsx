import React from 'react';
import '../styles/Board.css'

interface Props {
    size: number;
}

const Board = ({ size }: Props) => {
    //     let grid = new Array(size);
    //     for (let i = 0; i < size; i++) {
    //         grid[i] = new Array(size); // [Array(3) x size] but empty!!!
    //         // grid.push(new Array(size)); // [empty x size, Array(size) x size]
    //     };

    const gridArray: (null[] | string[])[] = Array.from({ length: size }, () =>
        Array.from({ length: size }, () => null)
    ); // [Array(3) x size] !!! BUT NOT EMPTY !!! [[null, null, null], ...]

    const [player, togglePlayer] = React.useState<boolean>(false);
    const [grid, setGrid] = React.useState<(string | null)[][]>(gridArray);

    const updateGridCell = (rowIndex: number, colIndex: number, player: boolean) => {
        if (grid[rowIndex][colIndex] === null) {
            const gridCopy = [...grid];
            // const gridCopy = grid.map(row => [...row.map(cell => cell)]);
            gridCopy[rowIndex][colIndex] = player ? "X" : "O";
            togglePlayer(!player);
            setGrid(gridCopy);
        }
    };

    function checkRows(board: (string | null)[][]) {
        for (let row = 0; row < size; row++) {
            if (board[row].every(cell => cell === "X") || board[row].every(cell => cell === "O")) {
                return true; // Row win found
            }
        }
        return false; // No row win
    }

    function checkColumns(board: (string | null)[][]) {
        for (let col = 0; col < board[0].length; col++) {
            let columnElements = [];
            for (let row = 0; row < board.length; row++) {
                columnElements.push(board[row][col]);
            }
            // Check if all elements in the column are the same and not empty
            if (columnElements.every(cell => cell === 'X') || columnElements.every(cell => cell === 'O')) {
                return true; // Column win found
            }
        }
        return false; // No column win
    }

    function checkDiagonalWin(board: (string | null)[][]) {
        // Check main diagonal (from top-left to bottom-right)
        let mainDiagonalElements = [];
        for (let i = 0; i < board.length; i++) {
            mainDiagonalElements.push(board[i][i]);
        }

        // Check anti-diagonal (from top-right to bottom-left)
        let antiDiagonalElements = [];
        for (let i = 0; i < board.length; i++) {
            antiDiagonalElements.push(board[i][board.length - 1 - i]);
        }

        // Check if all elements in either diagonal are the same and not empty
        if ((mainDiagonalElements.every(cell => cell === 'X') || mainDiagonalElements.every(cell => cell === 'O')) ||
            (antiDiagonalElements.every(cell => cell === 'X') || antiDiagonalElements.every(cell => cell === 'O'))) {
            return true; // Diagonal win found
        }
        return false; // No diagonal win
    }

    // Check for a draw (no winner, and no empty cells)
    if (!grid.flat().includes(null)) {
        return (
            <>
                <div className='draw'>Draw!</div>
                <button onClick={() => setGrid(gridArray)}>Play Again?</button>
            </>
        )

    }


    if (checkRows(grid)) {
        return (
            <>
                <div className='draw'>{`${!player ? "X" : "O"} Wins!`}</div>
                <button onClick={() => setGrid(gridArray)}>Play Again?</button>
            </>
        )
    }

    if (checkColumns(grid)) {
        return (
            <>
                <div className='draw'>{`${!player ? "X" : "O"} Wins!`}</div>
                <button onClick={() => setGrid(gridArray)}>Play Again?</button>
            </>
        )
    }

    if (checkDiagonalWin(grid)) {
        return (
            <>
                <div className='draw'>{`${!player ? "X" : "O"} Wins!`}</div>
                <button onClick={() => setGrid(gridArray)}>Play Again?</button>
            </>
        )
    }

    return (
        <table>
            <tbody>
                {grid.map((row: Array<string | null>, rowIndex: number) => (
                    <tr key={rowIndex} className='row'>
                        {row.map((cell: string | null, colIndex: number) => (
                            <td key={colIndex} className='cell' onClick={() => console.log(`clicked cell ${colIndex}`)}>
                                <button onClick={() => updateGridCell(rowIndex, colIndex, player)}>
                                    {cell ?? ''}
                                </button>
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table >
    )
}

export default Board