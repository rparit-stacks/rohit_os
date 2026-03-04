package com.rps.os_backned.terminal.command;

import com.rps.os_backned.terminal.model.CommandResult;
import com.rps.os_backned.terminal.model.SessionContext;
import org.springframework.stereotype.Component;

import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Component
public class RohitStatusCommand implements RohitCommand {

  @Override
  public String getName() {
    return "status";
  }

  @Override
  public String getDescription() {
    return "Show session status and theme info";
  }

  @Override
  public String getUsage() {
    return "rohit status";
  }

  @Override
  public CommandResult execute(List<String> args, SessionContext ctx) {
    DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
            .withZone(ZoneId.systemDefault());
    StringBuilder sb = new StringBuilder();
    sb.append("Session: ").append(ctx.getSessionId()).append("\n");
    sb.append("Directory: ").append(ctx.getCurrentDirectory()).append("\n");
    sb.append("Theme: ").append(ctx.getTheme()).append("\n");
    sb.append("Created: ").append(fmt.format(ctx.getCreatedAt())).append("\n");
    sb.append("Last access: ").append(fmt.format(ctx.getLastAccessedAt())).append("\n");
    return new CommandResult(sb.toString(), 0);
  }
}

