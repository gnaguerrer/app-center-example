package com.appcenterexample;


import static androidx.test.espresso.Espresso.onView;
import static androidx.test.espresso.action.ViewActions.click;
import static androidx.test.espresso.action.ViewActions.closeSoftKeyboard;
import static androidx.test.espresso.action.ViewActions.replaceText;
import static androidx.test.espresso.assertion.ViewAssertions.matches;
import static androidx.test.espresso.matcher.ViewMatchers.isDisplayed;
import static androidx.test.espresso.matcher.ViewMatchers.withClassName;
import static androidx.test.espresso.matcher.ViewMatchers.withParent;
import static androidx.test.espresso.matcher.ViewMatchers.withText;
import static org.hamcrest.Matchers.allOf;
import static org.hamcrest.Matchers.is;

import android.view.View;
import android.view.ViewGroup;
import android.view.ViewParent;

import androidx.test.espresso.ViewInteraction;
import androidx.test.ext.junit.rules.ActivityScenarioRule;
import androidx.test.ext.junit.runners.AndroidJUnit4;
import androidx.test.filters.LargeTest;

import org.hamcrest.Description;
import org.hamcrest.Matcher;
import org.hamcrest.TypeSafeMatcher;
import org.hamcrest.core.IsInstanceOf;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;

@LargeTest
@RunWith(AndroidJUnit4.class)
public class MainActivityTest {

    @Rule
    public ActivityScenarioRule<MainActivity> mActivityScenarioRule =
            new ActivityScenarioRule<>(MainActivity.class);

    @Test
    public void mainActivityTest() {
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        ViewInteraction reactEditText = onView(
                allOf(childAtPosition(
                                childAtPosition(
                                        withClassName(is("com.facebook.react.ReactRootView")),
                                        0),
                                0),
                        isDisplayed()));
        reactEditText.perform(click());

        ViewInteraction reactEditText2 = onView(
                allOf(childAtPosition(
                                childAtPosition(
                                        withClassName(is("com.facebook.react.ReactRootView")),
                                        0),
                                0),
                        isDisplayed()));
        reactEditText2.perform(replaceText("3"), closeSoftKeyboard());

        ViewInteraction reactEditText3 = onView(
                allOf(childAtPosition(
                                childAtPosition(
                                        withClassName(is("com.facebook.react.ReactRootView")),
                                        0),
                                1),
                        isDisplayed()));
        reactEditText3.perform(click());

        ViewInteraction reactEditText4 = onView(
                allOf(childAtPosition(
                                childAtPosition(
                                        withClassName(is("com.facebook.react.ReactRootView")),
                                        0),
                                1),
                        isDisplayed()));
        reactEditText4.perform(replaceText("6"), closeSoftKeyboard());

        ViewInteraction reactEditText5 = onView(
                allOf(childAtPosition(
                                childAtPosition(
                                        withClassName(is("com.facebook.react.ReactRootView")),
                                        0),
                                2),
                        isDisplayed()));
        reactEditText5.perform(click());

        ViewInteraction reactEditText6 = onView(
                allOf(childAtPosition(
                                childAtPosition(
                                        withClassName(is("com.facebook.react.ReactRootView")),
                                        0),
                                2),
                        isDisplayed()));
        reactEditText6.perform(replaceText("1000"), closeSoftKeyboard());

        ViewInteraction reactEditText7 = onView(
                allOf(childAtPosition(
                                childAtPosition(
                                        withClassName(is("com.facebook.react.ReactRootView")),
                                        0),
                                3),
                        isDisplayed()));
        reactEditText7.perform(click());

        ViewInteraction reactEditText8 = onView(
                allOf(childAtPosition(
                                childAtPosition(
                                        withClassName(is("com.facebook.react.ReactRootView")),
                                        0),
                                3),
                        isDisplayed()));
        reactEditText8.perform(replaceText("10"), closeSoftKeyboard());

        ViewInteraction textView = onView(
                allOf(withText("A difference of: $588.4649586076298."),
                        withParent(withParent(IsInstanceOf.<View>instanceOf(android.widget.FrameLayout.class))),
                        isDisplayed()));
        textView.check(matches(withText("A difference of: $588.4649586076298.")));
    }

    private static Matcher<View> childAtPosition(
            final Matcher<View> parentMatcher, final int position) {

        return new TypeSafeMatcher<View>() {
            @Override
            public void describeTo(Description description) {
                description.appendText("Child at position " + position + " in parent ");
                parentMatcher.describeTo(description);
            }

            @Override
            public boolean matchesSafely(View view) {
                ViewParent parent = view.getParent();
                return parent instanceof ViewGroup && parentMatcher.matches(parent)
                        && view.equals(((ViewGroup) parent).getChildAt(position));
            }
        };
    }
}
