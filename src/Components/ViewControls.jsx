import React from 'react'


const ViewControls = ({filter, setFilter, sortType, setSortType}) => {

  console.log("Render ViewControl")
  return (
    <div className='vieControls' > 
        <div>
            <button className={filter === 'All' ? "filter-btn active" : "filter-btn"} onClick={() => setFilter("All")}>Все</button>
            <button className={filter === 'Completed' ? "filter-btn active" : "filter-btn"} onClick={() => setFilter("Completed")}>Завершенные</button>
            <button className={filter === 'Active' ? "filter-btn active" : "filter-btn"} onClick={() => setFilter("Active")}>Активные</button>
        </div>
        <div>
            <button className={sortType === 'Created' ? "filter-btn active" : "filter-btn"} onClick={() => setSortType("Created")}>По дате создание</button>
            <button className={sortType === 'Due' ? "filter-btn active" : "filter-btn"} onClick={() => setSortType("Due")}>По дате выполнение</button>
        </div>
       
    </div>
  )
}

export default React.memo(ViewControls);
