const timeFormatter = (timeString: string) => {
    const date = new Date(timeString);
    return `${date.toLocaleString('default', {year: 'numeric',day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'})}`;
};

export default timeFormatter;