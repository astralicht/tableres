<div id="tables">
    <div flex="v">
        <div flex="h" v-center>
            <h4 class="partial-title">Tables</h4>
            <button flex="h" h-center v-center primary-bg white-fr style="height: 45px; width: 50px;"><i class="fa-solid fa-plus"></i></button>
        </div>
        <div class="tables-container" flex="h" h-center></div>
    </div>
</div>

<div class="table-modal" full-height full-width flex="h" h-center v-center>
    <div class="table-info-container" border-radius dark-bg>
        <div class="modal-header" flex="h" v-center>
            <div flex="h" v-center grow>
                <h4 id="modal-title" no-margin white-fr></h4>
                <p id="status-title" no-margin></p>
            </div>
            <button id="delete-table" pad danger-bg dark-bg danger-fr>Delete Table</button>
            <select id="status-dropdown" white-fr primary-bg onchange="authCheck(this)">
                <option value="NULL">Set Status</option>
                <option value="1" good-bg>Open</option>
                <option value="2" dark-bg>Occupied</option>
                <option value="3" warning-bg>Bill Out</option>
                <option value="4" info-bg>Reserved</option>
                <option value="5" danger-bg>Unavailable</option>
            </select>
            <button id="close-modal" pad dark-bg style="height: 100; width: 50px;"><i class="fa-solid fa-x" white-fr></i></button>
        </div>
        <div class="modal-body">
            <h4 no-margin>Orders</h4>
            <ul class="order-list"></ul>
            <b>Special Requests</b>
            <ul class="requests"></ul>
        </div>
        <div class="modal-footer" flex="h" v-center h-end>
            
        </div>
    </div>
</div>