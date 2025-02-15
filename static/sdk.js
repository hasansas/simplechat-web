var MYLIBRARY = MYLIBRARY || (function () {
  var _args = {};

  return {
    init: function (Args) {
      _args = Args;
      this.loadStyle()
      this.runLibrary()
    },
    runLibrary: function () {
      this.createWidget()
      const chat = document.getElementById('simplechat-container')
      const btnOpen = document.getElementById('simplechat-open-btn')
      const btnClose = document.getElementById('simplechat-close-btn')
      btnOpen.addEventListener("click", () => {
        btnOpen.style.display = "none";
        chat.style.display = "block";
      });
      btnClose.addEventListener("click", () => {
        chat.style.display = "none";
        btnOpen.style.display = "flex";
      });
    },
    createWidget() {
      const sc = document.createElement("div");
      sc.id = 'simplechat'

      sc.insertAdjacentHTML('afterbegin', `
        <button type="button" id="simplechat-open-btn" class="simplechat-btn simplechat-btn--icon x-large btn-chat">
          <div>
            <svg
              viewBox="0 0 60 60"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
              fill="white"
            >
            <path
              d="M30,1.5c-16.542,0-30,12.112-30,27c0,5.204,1.646,10.245,4.768,14.604c-0.591,6.537-2.175,11.39-4.475,13.689
              c-0.304,0.304-0.38,0.769-0.188,1.153C0.275,58.289,0.625,58.5,1,58.5c0.046,0,0.092-0.003,0.139-0.01
              c0.405-0.057,9.813-1.411,16.618-5.339C21.621,54.71,25.737,55.5,30,55.5c16.542,0,30-12.112,30-27S46.542,1.5,30,1.5z M16,32.5
              c-2.206,0-4-1.794-4-4s1.794-4,4-4s4,1.794,4,4S18.206,32.5,16,32.5z M30,32.5c-2.206,0-4-1.794-4-4s1.794-4,4-4s4,1.794,4,4
              S32.206,32.5,30,32.5z M44,32.5c-2.206,0-4-1.794-4-4s1.794-4,4-4s4,1.794,4,4S46.206,32.5,44,32.5z"
            />
            </svg>
          </div>
        </button>
        <div id="simplechat-container" class="simplechat-container">
          <div class="simplechat-toolbar">
            <div>
              <div class="simplechat-title">SimpleChat</div>
              <div class="simplechat-subtitle"> Maecenas ultrices non felis eu</div>
            </div>
            <div class="simplechat-spacer"></div>
            <button type="button" id="simplechat-close-btn" class="simplechat-btn simplechat-btn--icon">
              <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
              >
                <rect width="24" height="24" fill="white" />
                <path
                  d="M7 17L16.8995 7.10051"
                  stroke="#000000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7 7.00001L16.8995 16.8995"
                  stroke="#000000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
          <div class="simplechat-box">
            <iframe width="100%" height="100%" frameBorder="0" scrolling="no" src="http://localhost:3355/chat"></iframe>
          </diV>
        </diV>
        `);

      const s = document.getElementsByTagName('script')[0];
      document.body.insertBefore(sc, s);
    },
    loadStyle() {
      const style = document.createElement("style")
      style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
      #simplechat{
        font-family: "Kanit", serif;
        font-weight: 400;
        font-style: normal;
        position: absolute;
        bottom: 16px;
        right: 32px;
        z-index: 999999 !important;
      }
      .simplechat-container{
        display:none;
        overflow: hidden;
        border-radius: 16px;
        box-shadow: 0 5px 40px rgba(0, 0, 0, .16);
        transition: opacity 0.2s linear, transform 0.25s linear;
      }
      .simplechat-box{
        width: 400px;
        height: 600px;
        margin: 0px;
        padding: 0px;
      }
      .simplechat-toolbar{
        align-items: center;
        display: flex;
        position: relative;
        z-index: 0;
        padding: 16px;
      }
      .simplechat-btn{
      }
      .simplechat-spacer{
        flex-grow: 1 !important;
      }
      .simplechat-title{
        flex: 1 1 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        align-self: center;
        font-size: 1.2rem;
      }
      .simplechat-subtitle{
        font-weight: 300;
        line-height: 1.2;
        font-size: 0.875rem;
        flex: 1 1 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: rgba(0, 0, 0, 0.6);
      }
      .simplechat-btn{
        cursor: pointer;
        align-items: center;
        border-radius: 4px;
        display: inline-flex;
        flex: 0 0 auto;
        font-weight: 500;
        letter-spacing: 0.0892857143em;
        justify-content: center;
        outline: 0;
        position: relative;
        -webkit-text-decoration: none;
        text-decoration: none;
        text-indent: 0.0892857143em;
        text-transform: uppercase;
        transition-duration: 0.28s;
        transition-property: box-shadow, transform, opacity;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
        vertical-align: middle;
        white-space: nowrap;
        border: 0 !important;
      }
      .simplechat-btn--icon{
        height: 40px;
        width: 40px;
        background: none !important;
      }
      .simplechat-btn--icon.x-large{
        height: 64px;
        width: 64px;
      }
      .simplechat-btn--icon.btn-chat{
        background: #1260FE !important;
        height: 64px;
        width: 64px;
        border-radius: 32px;
      }
      .btn-chat div{
        height: 32px;
        width: 32px;
      }
      .btn-chat:hover{
        box-shadow: 0 8px 32px rgba(0, 0, 0, .4) !important;
      }
      `
      document.head.appendChild(style)
    },
  };
}());
