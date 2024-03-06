import './TabListAdd.css';
import React, { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
function TabListAdd() {
  
  return (
    
    <div className='TabListAdd'>
        <div class="wrappertab">
  <div class="tabs">
    <div class="tab">
      <input type="radio" name="css-tabs" id="tab-1" checked class="tab-switch"/>
      <label for="tab-1" class="tab-label">Add Item</label>
      <div class="tab-content">
        <div className='inputdata'>
        <h4>Item Name:</h4>
        <input type="text" placeholder="ex. jaya" required/>
        </div>
        <div className='inputdata'>
        <h4>Item Quantity:</h4>
        <input type="number" placeholder="ex. 1" required/>
        </div>
        <div className='inputdata'>
            <h4>Item Price:</h4>
            <div style={{display: 'flex', alignItems: 'center'}}>
            <span style={{marginRight: '5px'}}>Rp.</span>
            <input type="number" id="rupiah" name="rupiah" pattern="^\d{1,3}(,\d{3})*(\.\d+)?$" placeholder="ex. 100.000.000" required />
         </div>

        
        </div>
        <div className='inputbutton'>
             <Link to="#" className='subm'>Submit</Link>
        </div>
        
      </div>
    </div>
    <div class="tab">
      <input type="radio" name="css-tabs" id="tab-2"  class="tab-switch"/>
      <label for="tab-2" class="tab-label">Add Sales</label>
      <div class="tab-content">
        <div className='inputdata'>
        <h4>Sales Name:</h4>
        <input type="text" placeholder="ex. jaya" required/>
        </div>
        <div className='inputdatas'>
        <h4>Sales Date of Birth:</h4>
        <input type="date" placeholder="enter DOB" required/>
        </div>
        <div className='inputdata'>
            <h4>Sales Address:</h4>
            <input type="text" placeholder="ex. Jawa Barat" required/>

        </div>
        <div className='inputdata'>
            <h4>Sales KTP:</h4>
            <input type="file" id="file" name="file" accept="image/*" multiple/>

        </div>
        <div className='inputbutton'>
             <Link to="#" className='subm'>Submit</Link>
        </div>
        
      </div>
       </div>
    
  </div>
</div>
    </div>
  );
}

export default TabListAdd;