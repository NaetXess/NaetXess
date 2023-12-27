<script>
  export let classes = "",
    width = "",
    sm = "",
    md = "",
    lg = "",
    xl = "",
    xxl = "",
    id = "";
</script>

<div
  {id}
  class="{width ? 'col-' + width : ''} {sm ? 'col-sm-' + sm : ''} {md
    ? 'col-md-' + md
    : ''} {lg ? 'col-lg-' + lg : ''} {xl ? 'col-xl-' + xl : ''} {xxl
    ? 'col-xxl-' + xxl
    : ''} {classes ? classes : 'p-0'} "
>
  <slot />
</div>
