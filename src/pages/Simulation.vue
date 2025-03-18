<template>
    <div class="row">
        <div class="col-md-2 col-12">
            <SimulationList />
        </div>
        <div class="col-md-10 col-12">
            <div class="row">
                <SimulationShowCard />
                <SimulationAdd />

            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "Simulation"
}
</script>

<script lang="ts" setup>
import SimulationAdd from '../components/simulation/SimulationAdd.vue';
import SimulationList from '../components/simulation/SimulationList.vue';
import SimulationShowCard from '../components/simulation/SimulationShowCard.vue';
</script>

<style></style>