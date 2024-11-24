<div id="reservations">
    <div flex="v" grow>
        <div flex="h" v-center>
            <h4 class="partial-title">Reservations</h4>
            <button flex="h" h-center v-center primary-bg white-fr style="height: 45px; width: 50px;"><i class="fa-solid fa-plus"></i></button>
            <div flex="h" h-end v-center grow>
                <form onsubmit="this.preventDefault();" flex="h" v-center>
                    <input type="date" id="res-date-filter">
                    <p no-margin onclick="fetchReservations" flex="h" v-center dark-bg pad><i class="fa-solid fa-filter"></i>Filter</p>
                </form>
            </div>
        </div>
        <div id="active-reservations"><p style='text-align: center'><i>There are no reservations today.</i></p></div>
    </div>
</div>