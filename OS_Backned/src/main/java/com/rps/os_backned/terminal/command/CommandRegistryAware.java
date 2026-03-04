package com.rps.os_backned.terminal.command;

import java.util.List;

public interface CommandRegistryAware {

    void setCommands(List<RohitCommand> commands);
}

