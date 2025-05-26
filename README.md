
# 📘 Word Dictionary App

A simple full-stack dictionary application where users can search for words, view definitions along with images and videos, and add new entries. Built with **MongoDB**, **Express.js**, **Node.js**, and a frontend of your choice (React, etc.).

---

## 🚀 Features

- 🏠 **Home Page**
- 🔍 **Search Bar** to find words
- 📖 **Display Word Details**:  
  - Word  
  - Definition  
  - Image (URL)  
  - Video (URL)
- ➕ **Add Word Form**:  
  - Add new word  
  - Add definition  
  - Image URL  
  - Video URL
- 💾 **MongoDB Integration** for persistent storage

---

## 🧠 Bonus Features (Optional)

- ✏️ Edit Word Details  
- 🗑️ Delete Word Entry  
- 📱 Mobile Responsive UI  
- ⏳ Loading Spinner while fetching data

---

## 🧪 API Endpoints

### `GET /words`  
Returns a list of all words.

**Response:**
```json
[
  {
    "word": "Learn",
    "definition": "To gain knowledge",
    "imageUrl": "https://...",
    "videoUrl": "https://..."
  }
]
```

---

### `GET /words/:id`  
Get a specific word by its MongoDB ID.

**Example:**  
`GET /words/60f6c2b3c4a9e12d14ef72aa`

**Response:**
```json
{
  "_id": "60f6c2b3c4a9e12d14ef72aa",
  "word": "Learn",
  "definition": "To gain knowledge",
  "imageUrl": "https://...",
  "videoUrl": "https://..."
}
```

---

### `GET /words/search/:query`  
Search for words matching the query in either the word or definition.

**Example:**  
`GET /words/search/learn`

**Response:**
```json
[
  {
    "word": "Learn",
    "definition": "To gain knowledge",
    "imageUrl": "https://...",
    "videoUrl": "https://..."
  }
]
```

---

### `POST /words`  
Add a new word to the dictionary.

**Request Body:**
```json
{
  "word": "Learn",
  "definition": "To gain knowledge",
  "imageUrl": "https://...",
  "videoUrl": "https://..."
}
```

**Response:**
```json
{
  "_id": "generated_id",
  "word": "Learn",
  "definition": "To gain knowledge",
  "imageUrl": "https://...",
  "videoUrl": "https://...",
  "createdAt": "2025-05-26T00:00:00.000Z"
}
```

---

### `PUT /words/:id`  
Update an existing word by its ID.

**Request Body (partial or full update):**
```json
{
  "definition": "To acquire knowledge or skill"
}
```

**Response:**
```json
{
  "_id": "60f6c2b3c4a9e12d14ef72aa",
  "word": "Learn",
  "definition": "To acquire knowledge or skill",
  "imageUrl": "https://...",
  "videoUrl": "https://..."
}
```

---

### `DELETE /words/:id`  
Delete a word by its ID.

**Response:**
```json
{
  "message": "Word deleted successfully"
}
```

---

## 🏗️ Tech Stack

- **Frontend**: React + TailwindCSS
- **Backend**: Node.js + Express
- **Database**: MongoDB (Mongoose)

---

## 📦 Installation

1. **Clone the Repository**
```bash
git clone https://github.com/yourusername/word-dictionary-app.git
cd word-dictionary-app
```

2. **Install Dependencies**
```bash
npm install
```

3. **Configure MongoDB**
- Set up a `.env` file:
```
MONGO_URI=mongodb://localhost:27017/worddictionary
PORT=5000
```

4. **Start the Server**
```bash
npm start
```

---

## 🖼️ UI Preview 

![App Screenshot](https://github.com/Bhardwaj-Prabal/SignLanguageDictionary/blob/main/frontend.png)
![App Screenshot](https://github.com/Bhardwaj-Prabal/SignLanguageDictionary/blob/main/Screenshot_20250526_124702.png)
