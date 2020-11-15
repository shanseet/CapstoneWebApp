import React, { useState, useEffect } from 'react';
import API from "../../utils/API";

function Note(props) {
    const [content, setContent] = useState("");
    const [edited, setEdited] = useState(false);

    useEffect(() => {
        setContent(props.content);
    }, [props])

    function handleChange(e) {
        setContent(e.target.value);
        setEdited(true);
    }

    const inputStyles = {
        width: "100%",
        fontSize: "0.8rem"
    }

    return (
        <div className="pt-3" style={{ fontSize: "0.85rem" }}>
            Notes:
            <textarea
                id="notes"
                style={inputStyles}
                rows="3"
                value={content}
                onChange={handleChange}
            />
            <button
                className="btn edit-btn"
                style={{ opacity: edited ? 1 : 0.4 }}
                disabled={!edited}
                onClick={() => {
                    API.editNotes(props.id, content);
                    props.editNote();
                    setEdited(false);
                }}
            >
                SAVE
            </button>
        </div>
    )
}

export default Note;