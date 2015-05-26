 <?php
    echo "<select id='drop_down' onchange='ProcessResponse(this.value)'>";
    echo "<option value='0'>Select a File:</option>";
    foreach (glob("XML/*.xml") as $file_name)
        echo "<option value='" . $file_name . "'>" . substr($file_name, 4) . "</option>";
    echo "</select>";
?> 