import { useState } from "react";
import "../App.css";

const POST_BODY_TEMPLATE = JSON.stringify(
  {
    name: "Rahul Kumar",
    email: "rahul@gmail.com",
    rollNo: "CS101",
    branch: "CSE",
    year: 2
  },
  null,
  2
);

const PUT_BODY_TEMPLATE = JSON.stringify(
  {
    name: "Chandan Mishra",
    email: "cm.updated@gmail.com",
    branch: "CSE",
    year: 3
  },
  null,
  2
);

function Assignment() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("http://localhost:3000/user");
  const [requestBody, setRequestBody] = useState(POST_BODY_TEMPLATE);
  const [response, setResponse] = useState("Response will appear here...");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  // Dropdown se method change hone par URL aur Body set hoti hai
  const handleMethodChange = (newMethod) => {
    setMethod(newMethod);
    if (newMethod === "GET") {
      setUrl("http://localhost:3000/user");
    } else if (newMethod === "POST") {
      setUrl("http://localhost:3000/user");
      setRequestBody(POST_BODY_TEMPLATE);
    } else if (newMethod === "PUT") {
      setUrl("http://localhost:3000/user/101");
      setRequestBody(PUT_BODY_TEMPLATE);
    } else if (newMethod === "DELETE") {
      setUrl("http://localhost:3000/user/101");
    }
  };

  const sendRequest = async () => {
    if (!url.trim()) {
      setResponse("Please enter API URL");
      return;
    }

    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json"
      }
    };

    if (method === "POST" || method === "PUT") {
      try {
        JSON.parse(requestBody);
      } catch (error) {
        setStatus("ERROR");
        setResponse(
          JSON.stringify(
            {
              error: "Invalid JSON in Request Body",
              message: error.message
            },
            null,
            2
          )
        );
        return;
      }
      options.body = requestBody;
    }

    try {
      setLoading(true);
      setStatus(null);
      setResponse("Sending request...");

      const res = await fetch(url, options);
      const contentType = res.headers.get("content-type");

      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        data = await res.text();
      }

      setStatus(res.status);

      if (typeof data === "object") {
        setResponse(JSON.stringify(data, null, 2));
      } else {
        setResponse(data);
      }
    } catch (error) {
      setStatus("ERROR");
      setResponse(
        JSON.stringify(
          {
            error: error.message,
            message:
              "Cannot connect to server. Make sure Express server is running on http://localhost:3000"
          },
          null,
          2
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="container">
        {/* Header */}
        <div className="header">
          <h1 className="title">API Testing Dashboard</h1>
          <p className="subtitle">
            Test your Express REST API without Postman
          </p>
        </div>

        {/* Request Input Bar */}
        <div className="request-row">
          <select
            className="method-select"
            value={method}
            onChange={(e) => handleMethodChange(e.target.value)}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>

          <input
            className="url-input"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="http://localhost:3000/user"
          />

          <button
            className="send-btn"
            onClick={sendRequest}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Request"}
          </button>
        </div>

        {/* Request Body (Sirf POST aur PUT ke liye dikhega) */}
        {(method === "POST" || method === "PUT") && (
          <div className="body-section">
            <h2 className="section-title">Request Body</h2>
            <textarea
              className="body-textarea"
              value={requestBody}
              onChange={(e) => setRequestBody(e.target.value)}
              spellCheck="false"
              rows={8}
            />
          </div>
        )}

        {/* Response Section */}
        <div className="response-section">
          <div className="response-header">
            <h2 className="section-title">Response</h2>
            {status !== null && (
              <span
                className={`status-pill ${status >= 200 && status < 300
                    ? "status-success"
                    : "status-error"
                  }`}
              >
                {status === "ERROR" ? "Request Failed" : `Status: ${status}`}
              </span>
            )}
          </div>

          <pre className="response-box">{response}</pre>
        </div>
      </div>
    </div>
  );
}

export default Assignment;