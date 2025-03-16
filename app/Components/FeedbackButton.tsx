"use client"; // Ensure this runs only on the client side

import * as Sentry from "@sentry/nextjs";
import { useEffect, useState } from "react";

export default function FeedbackButton() {
  const [widget, setWidget] = useState<any>(null);

  useEffect(() => {
    const feedback = Sentry.feedbackIntegration({ autoInject: false });
    const newWidget = feedback.createWidget(); // Create widget instance
    setWidget(newWidget);

    return () => {
      newWidget.removeFromDom(); // Cleanup on unmount
    };
  }, []);

  const showFeedbackForm = () => {
    if (widget) widget.appendToDom(); // Show feedback form manually
  };

  return <button onClick={showFeedbackForm}>Give Feedback</button>;
}
