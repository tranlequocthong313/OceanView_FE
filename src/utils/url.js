export default function getQuerys(url) {
    const { searchParams } = new URL(url);
    return Object.fromEntries([...searchParams.entries()]);
}
