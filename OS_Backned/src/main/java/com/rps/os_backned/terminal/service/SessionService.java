package com.rps.os_backned.terminal.service;

import com.rps.os_backned.terminal.model.SessionContext;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class SessionService {

    private final Map<String, SessionContext> sessions = new ConcurrentHashMap<>();

    public SessionContext getOrCreate(String sessionId) {
        String id = (sessionId == null || sessionId.isBlank())
                ? "anon-" + System.currentTimeMillis()
                : sessionId;
        SessionContext ctx = sessions.get(id);
        if (ctx == null) {
            ctx = new SessionContext(id);
            sessions.put(id, ctx);
        }
        ctx.setLastAccessedAt(Instant.now());
        return ctx;
    }
}

