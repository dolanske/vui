<script setup lang="ts">

</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Tables
    </h3>

    <p class="mb-l">
      This library has two way to define tables. By default, you can use the classic <code>table</code> element and compose simple tables. <br> Or you can go overkill with the  <code>{{ `<Table />` }}</code> component, which comes with its own composable function
    </p>

    <strong class="mb-s block">Simple vertical table</strong>

    <table class="mb-l">
      <thead>
        <tr>
          <th>One</th>
          <th>Two</th>
          <th>Three</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>First </th>
          <th>Second</th>
          <th>Third</th>
        </tr>
      </tbody>
    </table>

    <strong class="mb-s block">Simple horizontal table</strong>

    <table>
      <tbody>
        <tr>
          <th>One</th>
          <td>First</td>
        </tr>
        <tr>
          <th>Two</th>
          <td>Second</td>
        </tr>
        <tr>
          <th>Three</th>
          <td>Third</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
