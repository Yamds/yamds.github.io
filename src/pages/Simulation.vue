<template>
    <div class="row">
        <h2>装备模拟</h2>
        <div>
            <SimulationList />
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name: "Simulation"
    }
</script>

<script lang="ts" setup>
    import SimulationList from '../components/simulation/SimulationList.vue';

</script>

<style>

</style>