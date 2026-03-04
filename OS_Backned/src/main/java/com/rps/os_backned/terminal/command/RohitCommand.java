package com.rps.os_backned.terminal.command;

import com.rps.os_backned.terminal.model.CommandResult;
import com.rps.os_backned.terminal.model.SessionContext;

import java.util.List;

public interface RohitCommand {

    String getName();

    String getDescription();

    String getUsage();

    CommandResult execute(List<String> args, SessionContext ctx);
}

