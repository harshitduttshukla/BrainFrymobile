package com.brainfry.app

import android.accessibilityservice.AccessibilityService
import android.content.Context
import android.content.Intent
import android.view.accessibility.AccessibilityEvent
import android.view.accessibility.AccessibilityNodeInfo

class AppBlockerService : AccessibilityService() {

    override fun onAccessibilityEvent(event: AccessibilityEvent) {
        if (event.packageName == null) return
        val packageName = event.packageName.toString()

        // Read dynamic blocking state from SharedPreferences
        val sharedPref = getSharedPreferences("BrainFryPrefs", Context.MODE_PRIVATE)
        val isReelsBlocked = sharedPref.getBoolean("shortsReelsBlocked", false)

        if (isReelsBlocked) {
            // Intercept YouTube or Instagram
            if (packageName == "com.google.android.youtube" || packageName == "com.instagram.android") {
                val rootNode = rootInActiveWindow
                if (rootNode != null) {
                    val isShortsOrReels = scanForShortsOrReels(rootNode, packageName)
                    if (isShortsOrReels) {
                        // Go home (Block/Intercept action)
                        val intent = Intent(Intent.ACTION_MAIN)
                        intent.addCategory(Intent.CATEGORY_HOME)
                        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
                        startActivity(intent)
                    }
                }
            }
        }
    }

    private fun scanForShortsOrReels(node: AccessibilityNodeInfo, packageName: String): Boolean {
        // Scan text content and content descriptions
        val text = node.text?.toString()?.lowercase() ?: ""
        val contentDescription = node.contentDescription?.toString()?.lowercase() ?: ""

        if (packageName == "com.instagram.android") {
            // Instagram Reels: Check for text/description matching reels/clips
            if (text == "reels" || contentDescription == "reels" || text.contains("clip")) {
                return true
            }
        }

        if (packageName == "com.google.android.youtube") {
            // YouTube Shorts: Check for text/description matching shorts
            if (text == "shorts" || contentDescription == "shorts") {
                return true
            }
        }

        // Recursively scan all child layout nodes
        for (i in 0 until node.childCount) {
            val child = node.getChild(i) ?: continue
            if (scanForShortsOrReels(child, packageName)) {
                return true
            }
        }
        return false
    }

    override fun onInterrupt() {
        // Required abstract method implementation
    }
}
