<template>
    <div class="row">
        <!-- <h2 class="col-md-2 col-12">装备模拟</h2> -->
        <div class="col-md-2 col-12">
            <SimulationList />
        </div>
        <div class="col-md-10 col-12" style="background-color: var(--ctp-surface0);">
            <SimulationAdd />
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

</script>

<style>

</style>