export default function getQuerys(url) {
    const { searchParams } = new URL(url);
    if (searchParams) {
        return Object.fromEntries([...searchParams.entries()]);
    }
    return {};
}
