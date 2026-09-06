function Food() {
    const food1 = { "name": "orange", };
    const food2 = "banana";
    return (
        <div>
            <h1>Food Component</h1>
            <p>This is the Food component.</p>
            <ul>
                <li>Apple</li>
                <li>{food1}</li>
                <li>{food2.toUpperCase()}</li>
            </ul>
        </div>
    );
}
export default Food;