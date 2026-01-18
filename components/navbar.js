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
          <div>Sofas & Couches</div>
          <div>Sectionals</div>
          <div>Benches</div>
          <div>Ottomans & Poufs</div>
          <div>Accent Chairs</div>
          <div>Recliners</div>
          <div>Coffee & Accent Tables</div>
          <div>TV Stands</div>
        </div>
        <div>
          <div class="dark-div">Patio & Outdoor Furniture</div>
          <div>Patio Furniture Sets</div>
          <div>Sofas, Chairs & Sectionals</div>
          <div>Dining Sets</div>
          <div>Coffee & Side Tables</div>
          <div>Chaise Lounges</div>
          <div>Adirondack Chairs</div>
        </div>
      </div>
      <div>
        <div>
          <div class="dark-div">Bedroom Furniture</div>
          <div>Beds</div>
          <div>Bedroom Sets</div>
          <div>Headboards</div>
          <div>Bed Frames</div>
          <div>Dressers & Chests</div>
          <div>Nightstands</div>
          <div>Armoires & Wardrobes</div>
          <div>Mattresses</div>
          <div>Kids Beds</div>
        </div>
        <div>
          <div class="dark-div">Office Furniture</div>
          <div>Desks</div>
          <div>Office Chairs</div>
          <div>Small Space Desks</div>
          <div>Office Shelves & Storage</div>
          <div>File Cabinets</div>
        </div>
      </div>
      <div>
        <div>
          <div class="dark-div">Dining, Kitchen & Bar</div>
          <div>Kitchen & Dining Sets</div>
          <div>Kitchen & Dining Chairs</div>
          <div>Kitchen & Dining Tables</div>
          <div>Counter & Bar Stools</div>
          <div>Bar Tables</div>
          <div>Buffets & Sideboards</div>
          <div>Home Bars</div>
          <div>Kitchen Islands & Carts</div>
          <div>Kitchen Furniture</div>
        </div>
        <div>
          <div class="dark-div">More</div>
          <div>Entryway</div>
          <div>Bathroom</div>
          <div>Home Gym</div>
          <div>Rec Room</div>
          <div>Small Space Living</div>
        </div>
      </div>
      <div>
        <div class="dropdown-img-cont">
          <div>
            <img
              src="https://i.postimg.cc/tg7z1Kz4/Warrenton-Boho-Handcrafted-2-Door-Acacia-Wood-Sideboard-by-Christopher-Knight-Home.jpg"
              alt=""
            />
          </div>
          <div>extra 15% off</div>
          <div>Select Furniture by Christopher Knight*</div>
        </div>
        <div>
          <div class="dark-div">More Ways to Shop</div>
          <div class="red-div">Featured Sales</div>
          <div class="red-div">New Arrivals</div>
          <div class="red-div">Clearance</div>
          <div class="red-div">Furniture Advice</div>
        </div>
      </div>
    </div>
 

      
    </div>
  </div>`

}
export default navbar;