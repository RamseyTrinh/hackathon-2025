export const numberWithComas = (number, comas) => {
    return number
        .toString()
        .replace(
            /\B(?=(\d{3})+(?!\d))/g,
            comas,
        )
}