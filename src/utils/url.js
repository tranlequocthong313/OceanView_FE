export default function getQuerys(url) {
    try {
        const { searchParams } = new URL(url);
        return Object.fromEntries([...searchParams.entries()]);
    } catch (error) {
        console.error(error);
    }
    return Object.fromEntries([]);
}
