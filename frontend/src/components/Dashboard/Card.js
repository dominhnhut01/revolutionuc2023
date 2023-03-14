import './Card.css';

function Card() {
    const [info, setInfo] = useState([
        {"cal": 10, "protein": 23, "fat": 12, "carbs": 34},
        {"cal": 12, "protein": 23, "fat": 22, "carbs": 34}
    ])

    return (
        <div className="card-container">
            <div className="card-title">
                <span className="card-title-text">Today's Calories</span>
            </div>
            <div className="card-content">
                <div className="column wrapper">
                    <span className="card-content-text">2045</span>
                </div>
            </div>
        </div>
    );
}