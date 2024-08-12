import React, { useState, useEffect } from 'react';

const MyLists = () => {
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    const storedLists = JSON.parse(localStorage.getItem('lists')) || [];
    setLists(storedLists);
  }, []);

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(lists));
  }, [lists]);

  const handleAddList = () => {
    if (newListName.trim() === '') return;
    const newList = { id: Date.now(), name: newListName, marked: false };
    setLists([...lists, newList]);
    setNewListName('');
  };

  const handleToggleMark = (id) => {
    const updatedLists = lists.map(list =>
      list.id === id ? { ...list, marked: !list.marked } : list
    );
    setLists(updatedLists);
  };

  const handleUpdateList = (id, newName) => {
    const updatedLists = lists.map(list =>
      list.id === id ? { ...list, name: newName } : list
    );
    setLists(updatedLists);
    setEditId(null);
  };

  const handleDeleteList = (id) => {
    const updatedLists = lists.filter(list => list.id !== id);
    setLists(updatedLists);
  };

  const handleEditClick = (id, name) => {
    setEditId(id);
    setEditName(name);
  };

  const filteredLists = () => {
    if (activeTab === 'all') return lists;
    if (activeTab === 'unmarked') return lists.filter(list => !list.marked);
    if (activeTab === 'marked') return lists.filter(list => list.marked);
    return [];
  };

  return (
    <div className="mylists-container">
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Lists
        </button>
        <button
          className={`tab-button ${activeTab === 'unmarked' ? 'active' : ''}`}
          onClick={() => setActiveTab('unmarked')}
        >
          Unmarked
        </button>
        <button
          className={`tab-button ${activeTab === 'marked' ? 'active' : ''}`}
          onClick={() => setActiveTab('marked')}
        >
          Marked
        </button>
      </div>

      {activeTab === 'all' && (
        <div className="list-creation">
          <input
            type="text"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            placeholder="Enter new list name"
          />
          <button onClick={handleAddList} className="add-button">Add List</button>
        </div>
      )}

      <ul className="list-items">
        {filteredLists().map(list => (
          <li key={list.id} className="list-item">
            {editId === list.id ? (
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onBlur={() => handleUpdateList(list.id, editName)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleUpdateList(list.id, editName);
                }}
                autoFocus
                className="list-item-name-edit"
              />
            ) : (
              <>
                <span className="list-item-name">{list.name}</span>
                <button onClick={() => handleEditClick(list.id, list.name)} className="edit-button">Edit</button>
              </>
            )}
            <button onClick={() => handleToggleMark(list.id)} className="mark-button">
              {list.marked ? 'Unmark' : 'Mark'}
            </button>
            <button onClick={() => handleDeleteList(list.id)} className="delete-button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyLists;