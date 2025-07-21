import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BASE_URL, REDIRECT_URL } from "../../config";


const DIMENSIONS = {
  image: [
    { label: "1080×1080", width: 1080, height: 1080 },
    { label: "940×788", width: 940, height: 788 },
  ],
  video: [
    { label: "1920×1080", width: 1920, height: 1080 },
    { label: "1080×1920", width: 1080, height: 1920 },
  ],
};

const DesignPage = () => {
  const [activeTab, setActiveTab] = useState("image");
  const [loadingLabel, setLoadingLabel] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const location = useLocation();

 useEffect(() => {
    const handleMessage = (event) => {
      // Optional: Add origin check
      // if (event.origin !== 'http://127.0.0.1:5174') return;
    
      const { urls, type } = event.data;
    
      if (type === 'image') {
        setImageUrl(urls);
      } else if (type === 'video') {
        setVideoUrl(urls);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  // Parse image_url and video_url from URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const img = params.get("image_Urls");
    const vid = params.get("video_Urls");
    if (!img && !vid) return;
    setActiveTab(img ? "image" : "video");

    if (img) setImageUrl(decodeURIComponent(img));
    if (vid) setVideoUrl(decodeURIComponent(vid));
    console.log(decodeURIComponent(vid))
  }, [location]);

  const handleDimensionClick = async ({ width, height, label }) => {
    setLoadingLabel(label);

    try {
      const res = await fetch(`${BASE_URL}/create-design?type=${activeTab}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json", "authorization": 'Bearer 8820' },
        body: JSON.stringify({ width, height,companyId: '8820' }),
      });

      const data = await res.json();
      console.log("�� Design created successfully:", data);
      const encodedUrl = encodeURIComponent(data.edit_url);
      window.open(`${REDIRECT_URL}/canvaDesign/${encodedUrl}`, '_blank');
      // window.location.href = data.edit_url;
    } catch (error) {
      console.error("❌ Failed to create design:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoadingLabel(null);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "80px", fontFamily: "Arial" }}>
      <h2 style={{ marginBottom: "30px" }}>🎨 Start Your Canva Design</h2>

      {/* Tabs */}
      <div style={{ marginBottom: "20px" }}>
        {["image", "video"].map((type) => (
          <button
            key={type}
            onClick={() => setActiveTab(type)}
            style={{
              margin: "0 10px",
              padding: "10px 20px",
              backgroundColor: activeTab === type ? "#007bff" : "#f0f0f0",
              color: activeTab === type ? "white" : "black",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Dimensions */}
      <h3>📐 Select Dimensions</h3>
      <div style={{ marginTop: "20px" }}>
        {DIMENSIONS[activeTab].map((dim) => (
          <button
            key={dim.label}
            onClick={() => handleDimensionClick(dim)}
            disabled={loadingLabel === dim.label}
            style={{
              margin: "10px",
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              opacity: loadingLabel === dim.label ? 0.6 : 1,
            }}
          >
            {loadingLabel === dim.label ? "Redirecting..." : dim.label}
          </button>
        ))}
      </div>

      {/* Render image if image_url is present */}
      {imageUrl && (
        <div style={{ marginTop: "40px" }}>
          <h3>🖼️ Image Preview</h3>
          <img
            src={imageUrl}
            alt="Canva Design"
            style={{
              maxWidth: "80%",
              height: "auto",
              border: "1px solid #ccc",
              borderRadius: "8px",
              marginTop: "10px",
            }}
          />
        </div>
      )}

      {/* Render video if video_url is present */}
      {videoUrl && (
        <div style={{ marginTop: "40px" }}>
          <h3>🎥 Video Preview</h3>
          <video
            src={videoUrl}
            controls
            style={{
              maxWidth: "80%",
              border: "1px solid #ccc",
              borderRadius: "8px",
              marginTop: "10px",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DesignPage;
