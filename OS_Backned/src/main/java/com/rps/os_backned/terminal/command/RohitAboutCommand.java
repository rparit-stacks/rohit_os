package com.rps.os_backned.terminal.command;

import com.rps.os_backned.terminal.model.CommandResult;
import com.rps.os_backned.terminal.model.SessionContext;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class RohitAboutCommand implements RohitCommand {

    @Override
    public String getName() {
        return "about";
    }

    @Override
    public String getDescription() {
        return "Short summary about Rohit";
    }

    @Override
    public String getUsage() {
        return "rohit about";
    }

    @Override
    public CommandResult execute(List<String> args, SessionContext ctx) {
        StringBuilder sb = new StringBuilder();
        sb.append("👋 Hey, I'm Rohit.\n\n");
        sb.append("Full Stack / Java Backend Developer who likes turning real-world problems\n");
        sb.append("into clean APIs, solid architectures, and retro-styled UIs like this RohitOS.\n\n");
        sb.append("Try:\n");
        sb.append("  rohit skills      - see my tech stack\n");
        sb.append("  rohit projects    - list key projects\n");
        sb.append("  rohit experience  - work history\n");
        sb.append("  rohit contact     - how to reach me\n");
        return new CommandResult(sb.toString(), 0);
    }
}

