import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import Tesseract from "tesseract.js";
import { formatBill } from "./lib/utils";

function App() {
    const [imageFile, setImageFile] = useState(null);
    const [accuracy, setAccuracy] = useState(0);
    const [items, setItems] = useState([]);
    const handleFileChange = (event) => {
        if (event.target.files.length) {
            setImageFile(event.target.files[0]);
        }
    };
    const [progress, setProgress] = useState(0);
    const recognizeText = () => {
        if (!imageFile) return;
        Tesseract.recognize(imageFile, "eng", {
            logger: (m) => {
                setProgress((m?.progress ?? 0) * 100);
            },
        })
            .catch((err) => {
                console.error(err);
            })
            .then((result) => {
                const formattedItems = formatBill(
                    result.data.lines.map((item) => item.text)
                );
                setItems(formattedItems);
                setAccuracy(result.data.confidence);
            });
    };
    return (
        <div className="container">
            {imageFile ? (
                <img src={URL.createObjectURL(imageFile)} className="preview" />
            ) : (
                ""
            )}
            <div class="input-group">
                <input
                    onChange={handleFileChange}
                    type="file"
                    class="form-control"
                    id="inputGroupFile04"
                    aria-describedby="inputGroupFileAddon04"
                    aria-label="Upload"
                />
                <button
                    onClick={recognizeText}
                    class="btn btn-outline-primary"
                    type="button"
                    id="inputGroupFileAddon04"
                >
                    Start
                </button>
            </div>
            <span className="progress-bar" style={{ width: `${progress}%` }} />
            {accuracy ? (
                <span>
                    Accuracy:{" "}
                    <span class="badge text-bg-info">{accuracy}%</span>
                </span>
            ) : (
                ""
            )}
            {items.length ? (
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Description</th>
                            <th scope="col">Quantity Price</th>
                            <th scope="col">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr>
                                <th scope="row" key={index}>
                                    {item.qty}
                                </th>
                                <td>{item.desc}</td>
                                <td>{item.unit_price}</td>
                                <td>{item.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                ""
            )}
        </div>
    );
}

export default App;
