package com.rps.os_backned.terminal.command;

import com.rps.os_backned.terminal.model.CommandResult;
import com.rps.os_backned.terminal.model.SessionContext;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class RohitHelpCommand implements RohitCommand, CommandRegistryAware {

    private List<RohitCommand> allCommands;

    @Override
    public void setCommands(List<RohitCommand> commands) {
        this.allCommands = commands;
    }

    @Override
    public String getName() {
        return "help";
    }

    @Override
    public String getDescription() {
        return "Show available commands and usage";
    }

    @Override
    public String getUsage() {
        return "rohit help";
    }

    @Override
    public CommandResult execute(List<String> args, SessionContext ctx) {
        if (allCommands == null || allCommands.isEmpty()) {
            return new CommandResult("No commands registered.", 0);
        }
        StringBuilder sb = new StringBuilder();
        sb.append("RohitOS Terminal - available commands:\n\n");
        for (RohitCommand cmd : allCommands) {
            sb.append(String.format("  rohit %-12s - %s%n", cmd.getName(), cmd.getDescription()));
        }
        return new CommandResult(sb.toString(), 0);
    }
}

