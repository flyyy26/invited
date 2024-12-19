// import React, { useState, useEffect } from 'react';

// function GenerateLink() {
//   const [name, setName] = useState('');
//   const [generatedLink, setGeneratedLink] = useState('');
//   const [links, setLinks] = useState([]);

//   // Ambil data dari database (tampilakan link yang sudah ada)
//   useEffect(() => {
//     const fetchLinks = async () => {
//       try {
//         const response = await fetch('http://localhost/backend_kalyan_maison/getLink.php');
//         const result = await response.json();
//         console.log("Links fetched:", result); // Cek hasil data di konsol
//         setLinks(result);
//       } catch (error) {
//         console.error('Error fetching links get:', error);
//       }
//     };

//     fetchLinks();
//   }, []);

//   const handleInputChange = (event) => {
//     setName(event.target.value);
//   };

//   const generateLink = async () => {
//     if (name.trim()) {
//       const link = `http://localhost:3000/${name}`;
//       setGeneratedLink(link);

//       // Kirim data ke PHP untuk disimpan
//       try {
//         const formData = new FormData();
//         formData.append('name', name);

//         const response = await fetch('http://localhost/backend_kalyan_maison/saveLink.php', {
//           method: 'POST',
//           body: formData
//         });

//         const result = await response.text();
//         console.log(result);

//         // Setelah link disimpan, ambil data lagi dari backend
//         const fetchLinks = async () => {
//           try {
//             const response = await fetch('http://localhost/backend_kalyan_maison/getLink.php');
//             const result = await response.json();
//             setLinks(result);
//           } catch (error) {
//             console.error('Error fetching links:', error);
//           }
//         };

//         fetchLinks();
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     }
//   };

//   const copyLink = (link) => {
//     navigator.clipboard.writeText(link).then(() => {
//       alert('Link copied to clipboard!');
//     }).catch((error) => {
//       console.error('Error copying link:', error);
//     });
//   };

//   return (
//     <div className="generate-link-page">
//       <h1>Generate Your Invitation Link</h1>
//       <div className="input-container">
//         <input
//           type="text"
//           placeholder="Enter your name"
//           value={name}
//           onChange={handleInputChange}
//         />
//         <button onClick={generateLink}>Generate Link</button>
//       </div>

//       {generatedLink && (
//         <div className="generated-link">
//           <h2>Your generated link:</h2>
//           <p>
//             <a href={generatedLink} target="_blank" rel="noopener noreferrer">{generatedLink}</a>
//           </p>
//         </div>
//       )}

//       <div className="saved-links">
//         <h2>Saved Links:</h2>
//         {links.length > 0 ? (
//           <ul>
//             {links.map((link, index) => (
//               <li key={index}>
//                 <a href={link.link} target="_blank" rel="noopener noreferrer">
//                   {link.link}
//                 </a>
//                 <button onClick={() => copyLink(link.link)}>Copy Link</button>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No links available</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default GenerateLink;


import React, { useState, useEffect } from 'react';

function GenerateLink() {
  const [name, setName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [links, setLinks] = useState([]);

  // Fungsi untuk mengambil data link dari backend
  const fetchLinks = async () => {
    try {
      const response = await fetch('http://localhost/backend_kalyan_maison/getLink.php');
      const data = await response.json();
      setLinks(data);
    } catch (error) {
      console.error('Error fetching links:', error);
    }
  };

  // Fungsi untuk menghapus link berdasarkan ID
  const deleteLink = async (id) => {
    try {
      const response = await fetch('http://localhost/backend_kalyan_maison/deleteLink.php', {
        method: 'POST',
        body: JSON.stringify({ id }), // Mengirim ID dalam body request
        headers: { 'Content-Type': 'application/json' },
      });
      const result = await response.json();
      console.log(result.message);

      // Memperbarui state links setelah berhasil menghapus
      fetchLinks();
    } catch (error) {
      console.error('Error deleting link:', error);
    }
  };

  // Handle input name change
  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  // Generate link function
    const generateLink = async () => {
        if (name.trim()) {
        const link = `http://localhost:3000/${name}`;
        setGeneratedLink(link);
        window.location.reload();

        // Kirim data ke PHP untuk disimpan
        try {
            const formData = new FormData();
            formData.append('name', name);

            const response = await fetch('http://localhost/backend_kalyan_maison/saveLink.php', {
            method: 'POST',
            body: formData
            });

            const result = await response.text();
            console.log(result);
        } catch (error) {
            console.error('Error:', error);
        }
        }
    };

    const copyLink = (link) => {
        navigator.clipboard.writeText(link).then(() => {
        alert('Link copied to clipboard!');
        }).catch((error) => {
        console.error('Error copying link:', error);
        });
    };

  useEffect(() => {
    // Ambil data link saat komponen pertama kali dimuat
    fetchLinks();
  }, []);

  return (
    <div className="generate-link-page">
      <h1>Generate Your Invitation Link</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={handleInputChange}
        />
        <button onClick={generateLink}>Generate Link</button>
      </div>

      {generatedLink && (
        <div className="generated-link">
          <h2>Your generated link:</h2>
          <p><a href={generatedLink} target="_blank" rel="noopener noreferrer">{generatedLink}</a></p>
        </div>
      )}

      {/* Tampilkan list link yang sudah ada */}
      <div className="link-list">
        <h2>Generated Links:</h2>
        <ul>
          {links.map(link => (
            <li key={link.id}>
              <p>{link.name}</p>
              <a href={link.link} target="_blank" rel="noopener noreferrer">{link.link}</a>

              <button onClick={() => copyLink(link.link)}>Copy Link</button>
              <button onClick={() => deleteLink(link.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default GenerateLink;
