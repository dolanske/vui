<script setup lang="ts">
import Card from './components/Card/Card.vue'
import Divider from './components/Divider/Divider.vue'
import ExampleAccordions from './examples/ExampleAccordions.vue'
import ExampleAlerts from './examples/ExampleAlerts.vue'
import ExampleAvatars from './examples/ExampleAvatars.vue'
import ExampleBadges from './examples/ExampleBadges.vue'
import ExampleBreadcrumbs from './examples/ExampleBreadcrumbs.vue'
import ExampleButtons from './examples/ExampleButtons.vue'
import ExampleCalendars from './examples/ExampleCalendars.vue'
import ExampleCards from './examples/ExampleCards.vue'
import ExampleCheckboxes from './examples/ExampleCheckboxes.vue'
import ExampleCopyClipboard from './examples/ExampleCopyClipboard.vue'
import ExampleDividers from './examples/ExampleDividers.vue'
import ExampleDrawers from './examples/ExampleDrawers.vue'
import ExampleDropdowns from './examples/ExampleDropdowns.vue'
import ExampleFlexGrid from './examples/ExampleFlexGrid.vue'
import ExampleInputs from './examples/ExampleInputs.vue'
import ExampleKBD from './examples/ExampleKBD.vue'
import ExampleModals from './examples/ExampleModals.vue'
import ExamplePalette from './examples/ExamplePalette.vue'
import ExamplePopouts from './examples/ExamplePopouts.vue'
import ExampleSheets from './examples/ExampleSheets.vue'
import ExampleSidebars from './examples/ExampleSidebars.vue'
import ExampleSkeletons from './examples/ExampleSkeletons.vue'
import ExampleSpinners from './examples/ExampleSpinners.vue'
import ExampleTables from './examples/ExampleTables.vue'
import ExampleTabs from './examples/ExampleTabs.vue'
import ExampleToasts from './examples/ExampleToasts.vue'
import ExampleTooltips from './examples/ExampleTooltips.vue'
</script>

<template>
  <main vaul-drawer-wrapper>
    <div class="container container-l p-xl">
      <h1 class="mb-l">
        VUI
      </h1>

      <Card class="typeface">
        <pre><code>export function removeColorPrefix(value: string): string {
  return value.replace('--dark', '--').replace('--light', '--')
}</code></pre>
      </Card>

      <p>The purpose of this page is to showcase and test every single component case</p>
      <Divider :size="64" />
      <ExamplePalette />
      <Divider :size="64" />
      <ExampleButtons />
      <Divider :size="64" />
      <ExampleCalendars />
      <Divider :size="64" />
      <ExampleBadges />
      <Divider :size="64" />
      <ExampleSpinners />
      <Divider :size="64" />
      <ExampleAvatars />
      <Divider :size="64" />
      <ExampleAlerts />
      <Divider :size="64" />
      <ExampleSkeletons />
      <Divider :size="64" />
      <ExampleAccordions />
      <Divider :size="64" />
      <ExampleBreadcrumbs />
      <Divider :size="64" />
      <ExampleCards />
      <Divider :size="64" />
      <ExampleCheckboxes />
      <Divider :size="64" />
      <ExampleCopyClipboard />
      <Divider :size="64" />
      <ExampleTabs />
      <Divider :size="64" />
      <ExampleInputs />
      <Divider :size="64" />
      <ExampleToasts />
      <Divider :size="64" />
      <ExampleTooltips />
      <Divider :size="64" />
      <ExampleSheets />
      <Divider :size="64" />
      <ExampleModals />
      <Divider :size="64" />
      <ExampleDrawers />
      <Divider :size="64" />
      <ExampleKBD />
      <Divider :size="64" />
      <ExamplePopouts />
      <Divider :size="64" />
      <ExampleDividers />
      <Divider :size="64" />
      <ExampleDropdowns />
      <Divider :size="64" />
      <ExampleFlexGrid />
      <Divider :size="64" />
      <ExampleTables />
      <Divider :size="64" />
      <ExampleSidebars />
    </div>
  </main>
</template>
