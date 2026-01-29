let navbar = () =>{
    return`
    <div class="header">
    <div>
      <button type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasExample"
      aria-label="Toggle menu"
      aria-controls="offcanvasExample" class="menupng">
      </button>
      
      <a href="index.html" class="overstocklogo">
        <img class="overstockIndex" src="https://i.postimg.cc/0yCKC2SV/svgexport-1.png" alt="Overstock Logo" />
      </a>
      <div class="class-input">
        <div>
          <label for="search-input" class="visually-hidden">Search</label>
          <input id="search-input" type="text" placeholder="Search" />
        </div>
        <div>
        <button type="button" aria-label="Search" class="search-button">
          <img src="https://i.postimg.cc/tgWqzB8p/Search-1.png" alt="">
        </button>
      </div>
      </div>
      <div id="account1" class="class-account class-account-common">
        <a href="signup.html" class="nav-link-flex">
          <div>
            <img src="https://i.postimg.cc/RCb3PDNz/User.png" alt="" />
          </div>
          <div>Account</div>
        </a>
        <div class="chevronup">
          <img src="https://i.postimg.cc/DZHpvK2K/Chevron-Up.png" alt="" />
        </div>
        <div class="account-dropdown-content">
          <a href="#" class="nav-link-block">My Account</a>
          <a href="#" class="nav-link-block">My Orders</a>
          <a href="#" class="nav-link-block">My Reviews</a>
          <a href="#" class="nav-link-block">Gift Cards</a>
          <a href="#" class="nav-link-block">Help</a>
          <a href="#" class="nav-link-block">Sign Out</a>
        </div>
      </div>
      <div class="class-account class-account-common">
        <a href="list.html" class="nav-link-flex" aria-label="Lists">
          <div>
            <img src="https://i.postimg.cc/B6TrjykP/Heart.png" alt="" />
          </div>
          <div>Lists</div>
        </a>
        <div class="chevronup">
          <img src="https://i.postimg.cc/DZHpvK2K/Chevron-Up.png" alt="" />
        </div>
        <div class="account-dropdown-content" style="right: -100%">
          <a href="#" class="nav-link-block">Favorites</a>
          <a href="#" class="nav-link-block">Save for Later</a>
          <a href="#" class="nav-link-block">View All My Lists</a>
          <a href="#" class="nav-link-block">Find a List</a>
        </div>
      </div>
      <div id="cart1" class="class-account">
        <a href="cart.html" class="nav-link-flex">
          <div>
            <img src="https://i.postimg.cc/DyZNh8vX/Cart-Empty.png" alt="Cart" />
          </div>
          <div>Cart</div>
        </a>
      </div>
    </div>
    <div class="section-div">
    <a href="furniture.html" class="nav-link-reset">Furniture</a>
      <div>Rugs</div>
      <div>Decor</div>
      <div>Bed & Bath</div>
      <div>Home Improvement</div>
      <div>Kitchen</div>
      <div>Outdoor</div>
      <div>Jewelry</div>
      <div>Lighting</div>
      <div>Kids & Baby</div>
      <div>More</div>
      <div>Holiday & Gifts</div>
      <div>Sales & Deals</div>
    </div>
    <div class="dropdown-content-main dropdown-content-part">
      <div>
        <div>
          <div class="dark-div">Living Room Furniture</div>
          <a href="livingRoom.html">Sofas & Couches</a>
          <a href="livingRoom.html">Sectionals</a>
          <a href="livingRoom.html">Benches</a>
          <a href="livingRoom.html">Ottomans & Poufs</a>
          <a href="livingRoom.html">Accent Chairs</a>
          <a href="livingRoom.html">Recliners</a>
          <a href="livingRoom.html">Coffee & Accent Tables</a>
          <a href="livingRoom.html">TV Stands</a>
        </div>
        <div>
          <div class="dark-div">Patio & Outdoor Furniture</div>
          <a href="furniture.html">Patio Furniture Sets</a>
          <a href="furniture.html">Sofas, Chairs & Sectionals</a>
          <a href="furniture.html">Dining Sets</a>
          <a href="furniture.html">Coffee & Side Tables</a>
          <a href="furniture.html">Chaise Lounges</a>
          <a href="furniture.html">Adirondack Chairs</a>
        </div>
      </div>
      <div>
        <div>
          <div class="dark-div">Bedroom Furniture</div>
          <a href="furniture.html">Beds</a>
          <a href="furniture.html">Bedroom Sets</a>
          <a href="furniture.html">Headboards</a>
          <a href="furniture.html">Bed Frames</a>
          <a href="furniture.html">Dressers & Chests</a>
          <a href="furniture.html">Nightstands</a>
          <a href="furniture.html">Armoires & Wardrobes</a>
          <a href="furniture.html">Mattresses</a>
          <a href="furniture.html">Kids Beds</a>
        </div>
        <div>
          <div class="dark-div">Office Furniture</div>
          <a href="furniture.html">Desks</a>
          <a href="furniture.html">Office Chairs</a>
          <a href="furniture.html">Small Space Desks</a>
          <a href="furniture.html">Office Shelves & Storage</a>
          <a href="furniture.html">File Cabinets</a>
        </div>
      </div>
      <div>
        <div>
          <div class="dark-div">Dining, Kitchen & Bar</div>
          <a href="furniture.html">Kitchen & Dining Sets</a>
          <a href="furniture.html">Kitchen & Dining Chairs</a>
          <a href="furniture.html">Kitchen & Dining Tables</a>
          <a href="furniture.html">Counter & Bar Stools</a>
          <a href="furniture.html">Bar Tables</a>
          <a href="furniture.html">Buffets & Sideboards</a>
          <a href="furniture.html">Home Bars</a>
          <a href="furniture.html">Kitchen Islands & Carts</a>
          <a href="furniture.html">Kitchen Furniture</a>
        </div>
        <div>
          <div class="dark-div">More</div>
          <a href="furniture.html">Entryway</a>
          <a href="furniture.html">Bathroom</a>
          <a href="furniture.html">Home Gym</a>
          <a href="furniture.html">Rec Room</a>
          <a href="furniture.html">Small Space Living</a>
        </div>
      </div>
      <div>
        <div class="dropdown-img-cont">
          <div>
            <img
              src="https://i.postimg.cc/tg7z1Kz4/Warrenton-Boho-Handcrafted-2-Door-Acacia-Wood-Sideboard-by-Christopher-Knight-Home.jpg"
              alt="Warrenton Boho Handcrafted 2-Door Acacia Wood Sideboard by Christopher Knight Home"
            />
          </div>
          <div>extra 15% off</div>
          <div>Select Furniture by Christopher Knight*</div>
        </div>
        <div>
          <div class="dark-div">More Ways to Shop</div>
          <a href="furniture.html" class="red-div">Featured Sales</a>
          <a href="furniture.html" class="red-div">New Arrivals</a>
          <a href="furniture.html" class="red-div">Clearance</a>
          <a href="furniture.html" class="red-div">Furniture Advice</a>
        </div>
      </div>
    </div>
 

      
    </div>
  </div>`

}
export default navbar;